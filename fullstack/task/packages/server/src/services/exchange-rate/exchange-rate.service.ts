import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExchangeRate } from '../../entities';

@Injectable()
export class ExchangeRateService {
    private readonly CNB_API_URL =
        'https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt';
    private readonly CACHE_DURATION_MS = 5 * 60 * 1000;

    constructor(
        @InjectRepository(ExchangeRate)
        private readonly repo: Repository<ExchangeRate>
    ) {}
    public async getExchangeRates(): Promise<ExchangeRate[]> {
        const last = await this.repo
            .createQueryBuilder('r')
            .orderBy('r.fetchedAt', 'DESC')
            .getOne();
        if (last) {
            const latestTs = last.fetchedAt;
            const now = Date.now();
            const isFresh = now - new Date(latestTs).getTime() < this.CACHE_DURATION_MS;

            if (!isFresh) {
                const freshRates = await this.fetchRatesFromCNB();
                const fetchedAt = freshRates[0]?.fetchedAt ?? new Date();

                await this.repo.delete({ fetchedAt });
                await this.repo.save(freshRates);
                return freshRates;
            }
            return await this.repo.find({ where: { fetchedAt: latestTs }, order: { code: 'ASC' } });
        }
        const freshRates = await this.fetchRatesFromCNB();
        await this.repo.save(freshRates);
        return freshRates;
    }

    public async lastFetchTime(): Promise<Date | null> {
        const last = await this.repo
            .createQueryBuilder('r')
            .orderBy('r.fetchedAt', 'DESC')
            .getOne();
        return last ? last.fetchedAt : null;
    }

    private async fetchRatesFromCNB(): Promise<ExchangeRate[]> {
        const res = await axios.get(this.CNB_API_URL, { responseType: 'text' });
        const lines = res.data
            .split('\n')
            .map((l: string) => l.trim())
            .filter(Boolean);
        const rows = lines.slice(2);
        const rates: ExchangeRate[] = [];

        for (const row of rows) {
            const parts = row.split('|');
            if (parts.length < 5) continue;

            const [country, currency, amountStr, code, rateStr] = parts;
            const amount = Number(amountStr);
            const rate = Number(rateStr.replace(',', '.'));

            const entity = new ExchangeRate();
            entity.country = country;
            entity.currency = currency;
            entity.amount = amount;
            entity.code = code;
            entity.rate = rate;
            entity.fetchedAt = new Date();
            entity.createdAtUtc = new Date();
            entity.version = 1;

            rates.push(entity);
        }

        return rates;
    }
}
