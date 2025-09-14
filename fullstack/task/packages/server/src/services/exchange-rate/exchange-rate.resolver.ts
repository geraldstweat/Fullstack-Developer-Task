import { Query, Resolver } from '@nestjs/graphql';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRate } from '../../entities';

@Resolver(() => ExchangeRate)
export class ExchangeRateResolver {
    constructor(private readonly exchangeRateService: ExchangeRateService) {}

    @Query(() => [ExchangeRate])
    async exchangeRates(): Promise<ExchangeRate[]> {
        return await this.exchangeRateService.getExchangeRates();
    }

    @Query(() => Date, { nullable: true })
    async lastFetchTime(): Promise<Date | null> {
        return await this.exchangeRateService.lastFetchTime();
    }
}
