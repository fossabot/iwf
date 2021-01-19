import {StringSnak as WikidataStringSnak} from '@wmde/wikibase-datamodel-types';
import Snak from '../Snak';
import normalizeOutput from '../utils/normalizeOutput';

/**
 * class for the StringSnak
 *
 * most used property of this type P1545 (series ordinal)
 *
 * @class
 */
export default class StringSnak extends Snak {
    value: string| undefined

    datatype = 'string';

    /**
     * @param {WikidataStringSnak} snak the snak for this class in json format
     */
    constructor(snak: WikidataStringSnak) {
        super(snak);

        this.value = snak.datavalue?.value;
    }

    /**
     *
     * @returns {WikidataStringSnak} the snak as json
     */
    toJSON(): WikidataStringSnak {
        return normalizeOutput({
            snaktype: this.snaktype,
            property: this.property,
            hash: this.hash,
            datavalue: this.hasValue ? {
                value: this.value,
                type: 'string'
            } : undefined,
            datatype: this.datatype
        }) as WikidataStringSnak;
    }

    /**
     * this function checks if two snaks are equal
     *
     * @static
     * @param {StringSnak} a snak a
     * @param {StringSnak} b snak b
     * @returns {boolean} true if the snaks are equal
     */
    static equals(a:StringSnak, b:StringSnak): boolean {
        return a.value === b.value;
    }
}
