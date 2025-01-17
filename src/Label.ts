import { LabelAndDescription, LabelLanguages } from '@wmde/wikibase-datamodel-types';
import { v4 as uuidv4 } from 'uuid';

import normalizeOutput from './utils/normalizeOutput';

/**
 * class for labels
 *
 * @class
 */
export default class Label {
    /** A ID for using things that don't have an ID */
    internalID: string;

    /** the language of the description */
    language: LabelLanguages;

    /** the value of the description */
    value: string;

    /**
     * @param {LabelAndDescription} label the label for this class in json format
     */
    constructor(label: LabelAndDescription) {
        this.language = label.language;
        this.value = label.value;
        this.internalID = uuidv4();
    }

    /**
     * @returns {LabelAndDescription} the label as json
     */
    toJSON(): LabelAndDescription {
        return normalizeOutput({
            language: this.language,
            value: this.value
        });
    }

    /**
     * this function checks if two Labels are equal
     *
     * @param {LabelAndDescription} other the other Label
     * @returns {boolean} true if the Labels are equal
     */
    equals(other: LabelAndDescription): boolean {
        return this.language === other.language && this.value === other.value;
    }

    /**
     *
     * @param {string} language the language of the label
     * @param {string} value the value of the label
     * @returns {Label} the label object
     */
    static fromString(language: LabelLanguages, value: string): Label {
        return new Label({ language, value });
    }
}
