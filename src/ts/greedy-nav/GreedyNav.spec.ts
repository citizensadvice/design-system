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

    describe('insertAfter', () => {
        let dom: JSDOM;
        let document: Document;
        let parent: HTMLElement;
        let child: HTMLElement;
        let newNode: HTMLElement;

        beforeEach(() => {
            dom = new JSDOM(
                '<div id="parent"><div id="child"></div></div>',
                jsdomConfig
            );

            document = dom.window.document;

            parent = document.querySelector<HTMLElement>('#parent')!;
            child = document.querySelector<HTMLElement>('#child')!;
            newNode = document.createElement('div');
            newNode.setAttribute('id', 'newNode');
        });

        afterEach(() => {
            document.body.innerHTML = '';
        });

        it('inserts a node after another', () => {
            insertAfter(newNode, child);

            expect(parent.querySelector<HTMLElement>('#newNode')).toBe(newNode);
        });

        it('makes no change if reference node is the document', () => {
            insertAfter(newNode, document);

            expect(
                document.querySelectorAll<HTMLElement>('#newNode')
            ).toHaveLength(0);
            expect(document.querySelectorAll('div')).toHaveLength(2);
        });

        it('makes no change if the reference node is a fragment', () => {
            const fragment = document.createElement('div');

            expect(() => insertAfter(newNode, fragment)).not.toThrow();
            expect(document.querySelectorAll('div')).toHaveLength(2);
        });
    });
});
