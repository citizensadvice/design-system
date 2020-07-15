/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/no-extraneous-dependencies */
import { JSDOM } from 'jsdom';

import { getClosest } from './GreedyNav';

describe('Greedy Nav', () => {
    describe('getClosest', () => {
        const dom = new JSDOM(
            '<div id="top" class="parent top" title="top"><div id="middle" class="parent middle" title="middle"><div id="bottom" class="bottom" title="top"></div></div></div>'
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

        xit('finds parent by attribute', () => {
            expect(getClosest(bottom, '[title]')).toBe(middle);
        });

        xit('finds grandparent by attribute', () => {
            expect(getClosest(bottom, '[title]')).toBe(top);
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
