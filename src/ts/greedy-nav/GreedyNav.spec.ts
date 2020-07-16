/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/no-extraneous-dependencies */
import { JSDOM } from 'jsdom';

import { getClosest } from './GreedyNav';

const jsdomConfig = { url: 'http://public-website.test:3000' };

describe('Greedy Nav', () => {
    describe('getClosest', () => {
        const dom = new JSDOM(
            '<div id="top" class="parent top" data-top="top"><div id="middle" class="parent middle" data-middle="middle"><div id="bottom" class="bottom" data-bottom="bottom"></div></div></div>',
            jsdomConfig
        );

        const { document } = dom.window;

        const top = document.querySelector<HTMLElement>('#top')!;
        const middle = document.querySelector<HTMLElement>('#middle')!;
        const bottom = document.querySelector<HTMLElement>('#bottom')!;

        it('finds direct ancestor node by id', () => {
            expect(getClosest(bottom, '#middle')).toBe(middle);
        });

        it('finds grandparent node by id', () => {
            expect(getClosest(bottom, '#top')).toBe(top);
        });

        it('finds parent by class', () => {
            expect(getClosest(bottom, '.parent')).toBe(middle);
        });

        it('finds grandparent by class', () => {
            expect(getClosest(bottom, '.top')).toBe(top);
        });

        it('finds parent by attribute', () => {
            expect(getClosest(bottom, '[data-middle]')).toEqual(middle);
        });

        it('finds grandparent by attribute', () => {
            expect(getClosest(bottom, '[data-top]')).toEqual(top);
        });

        it("doesn't find absent id", () => {
            expect(getClosest(bottom, '#no-there')).toBeFalsy();
        });

        it("doesn't find absent class", () => {
            expect(getClosest(bottom, '.not-there')).toBeFalsy();
        });

        it('returns false for absent attribute', () => {
            expect(getClosest(bottom, '[not-there]')).toBeFalsy();
        });
    });
});
