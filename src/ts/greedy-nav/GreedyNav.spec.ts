/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/no-extraneous-dependencies */
import { JSDOM } from 'jsdom';

import { getClosest, insertAfter } from './GreedyNav';

const jsdomConfig = { url: 'http://public-website.test:3000' };

describe('Greedy Nav', () => {
    describe('getClosest', () => {
        let dom: JSDOM;
        let document: Document;
        let top: HTMLElement;
        let middle: HTMLElement;
        let bottom: HTMLElement;

        beforeEach(() => {
            dom = new JSDOM(
                '<div id="top" class="parent top" data-top="top"><div id="middle" class="parent middle" data-middle="middle"><div id="bottom" class="bottom" data-bottom="bottom"></div></div></div>',
                jsdomConfig
            );

            document = dom.window.document;

            top = document.querySelector<HTMLElement>('#top')!;
            middle = document.querySelector<HTMLElement>('#middle')!;
            bottom = document.querySelector<HTMLElement>('#bottom')!;
        });

        afterEach(() => {
            document.body.innerHTML = '';
        });

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
