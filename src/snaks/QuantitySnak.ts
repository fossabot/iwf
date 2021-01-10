import {QuantitySnak as WikidataQuantitySnak} from '@wmde/wikibase-datamodel-types';
import Snak from '../Snak';
import normalizeOutput from '../utils/normalizeOutput';

function formatNumber(amount: number): string {
    if (amount >= (0)) {
        return `+${amount}`;
    }
    return `${amount}`;
}

export default class QuantitySnak extends Snak {
    _amount: string | undefined = undefined

    _upperBound: string | undefined = undefined

    _lowerBound: string | undefined = undefined

    unit: string | undefined

    datatype = 'quantity';

    constructor(snak: WikidataQuantitySnak) {
        super(snak);

        const amount = snak.datavalue?.value.amount;
        const upperBound = snak.datavalue?.value.upperBound;
        const lowerBound = snak.datavalue?.value.lowerBound;

        this._amount = amount;
        this._upperBound = upperBound;
        this._lowerBound = lowerBound;

        this.unit = snak.datavalue?.value.unit;
    }

    get amount(): number {
        return Number(this._amount);
    }

    set amount(number: number) {
        this._amount = formatNumber(number);
    }

    get upperBound(): number {
        return Number(this._upperBound);
    }

    set upperBound(number: number) {
        this._upperBound = formatNumber(number);
    }

    get lowerBound(): number {
        return Number(this._lowerBound);
    }

    set lowerBound(number: number) {
        this._lowerBound = formatNumber(number);
    }

    toJSON(): WikidataQuantitySnak {
        return normalizeOutput({
            snaktype: this.snaktype,
            property: this.property,
            hash: this.hash,
            datavalue: this.hasValue ? {
                value: {
                    amount: this._amount,
                    unit: this.unit,
                    upperBound: this._upperBound,
                    lowerBound: this._lowerBound
                },
                type: 'quantity'
            } : undefined,
            datatype: this.datatype
        }) as WikidataQuantitySnak;
    }
}
