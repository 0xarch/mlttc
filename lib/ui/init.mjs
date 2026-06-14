import { a } from "./elementring.mjs";

const wcStyleSheet = new CSSStyleSheet();
wcStyleSheet.replaceSync(`
@keyframes general_fadeIn_nomove_fixed_noreplace_dontrestore {
    from { opacity: 0 }
    to { opacity: 1 }
}
@keyframes general_fadeIn_fixed_noreplace_dontrestore {
    from { opacity: 0; transform: translateY(.5rem) }
    to { opacity: 1; transform: translateY(0) }
}`);

class HcwBodyFooter extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.adoptedStyleSheets.push(wcStyleSheet);
        shadow.innerHTML =
            `<style>
                a {
                    color: var(--link-color);
                }
            </style>
            <div>
                mlttc 2026 ${a('马陆梦想家', { href: 'https://space.bilibili.com/3493109946124506' })} ${a('LoFF_RtN', { href: 'https://space.bilibili.com/582594431' })} ALL RIGHTS RESERVED
            </div>`;
    }
}

class HcwFlex extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.adoptedStyleSheets.push(wcStyleSheet);
        shadow.innerHTML = `
        <style>
            .inner-root {
                display: flex;
                gap: 1rem;
            }
        </style>
        <div class='inner-root'>
            <slot></slot>
        </div>`;
    }
}

class HcwButton extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.adoptedStyleSheets.push(wcStyleSheet);
        shadow.innerHTML = `
        <style>
            :host {
                appearance: none;
                border: none;
                position: relative;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border-radius: var(--radius-lg);
                background-color: var(--button-bg);
                color: var(--button-color);
                padding: .45rem .25rem;
                backdrop-filter: blur(.5rem) saturate(3);
                box-shadow:
                    0 0 .25rem #0001,
                    inset 0 .1rem .025rem .025rem var(--glass-inner-hl),
                    inset 0 -.1rem .025rem .025rem var(--glass-inner-dl);
                text-shadow: 0 0 .25rem var(--glass-inner-hl);
                transition: var(--transition-fast);
                transition-property: transform, background-color, color, box-shadow;
                text-align: center;
                cursor: pointer;
                font-size: 1rem;
                min-height: 2.25rem;
                min-width: 2.25rem;
                text-decoration: none;
                -webkit-tap-highlight-color: transparent;
                animation: general_fadeIn_fixed_noreplace_dontrestore var(--transition-slow) 0s 1 forwards;
            }
            :host-context(hcw-card),
            :host-context([hcw-card]) {
                background-color: transparent;
                box-shadow:
                    0 0 .25rem #0001,
                    inset 0 .1rem .015rem .015rem var(--glass-inner-hl),
                    inset 0 -.1rem .015rem .015rem var(--glass-inner-dl);
                border-radius: var(--radius-md);
            }
            :host([large]) {
                font-size: 1.25rem;
            }
            :host([inline]) {
                display: inline-flex;
            }
            :host([icon]) {
                aspect-ratio: 1;
                height: 2rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            :host([icon][large]) {
                min-height: 3rem;
            }
            :host(:not([disabled], [primary], [variant]):hover) {
                background-color: var(--button-bg-hl);
                color: var(--button-color-hl);
            }
            :host([tp]) {
                background-color: transparent;
            }
            :host([fill]) {
                background-color: var(--button-fill-bg);
                color: var(--button-fill-color);
            }
            :host([variant='success']) {
                background-color: var(--success);
                color: var(--success-light);
            }
            :host([variant='danger']) {
                background-color: var(--danger);
                color: var(--danger-light);
            }
            :host([variant='warning']) {
                background-color: var(--warning);
                color: var(--warning-light);
            }
            :host([variant]:hover) {
                    filter: brightness(1.05);
            }
            :host([primary]) {
                background-color: var(--primary);
                color: var(--on-primary);
            }
            :host([primary]:hover) {
                background-color: var(--primary-hl);
                color: var(--on-primary-hl);
            }
            :host([flat]) {
                box-shadow: none;
            }
            :host([disabled]) {
                filter: saturate(0);
                cursor: not-allowed;
                box-shadow: none;
                color: var(--button-color-disabled);
            }
        </style>
        <slot></slot>
        `;
        if(this.hasAttribute('href')) {
            this.addEventListener('click', () => {
                open(this.getAttribute('href'), '_self');
            });
        }
    }
}

class HcwHero extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = `
        <style>
            :host {
                position: relative;
            }
            :host::before {
                content: '';
                position: absolute;
                top: 0; bottom: 0; right: 0; aspect-ratio: 1; max-width: 40%;
                background: url('/asset/bg-main.jpg') no-repeat center;
                background-size: cover;
                border-radius: var(--radius-lg);
            }
            h1, h2, p {
                margin: 1rem;
            }
            div {
                padding: 1rem;
                position: relative;
                max-width: 60%;
                word-wrap: break-all;
                overflow: hidden;
            }
        </style>
        <div>
            <slot></slot>
        </div>`;
    }
}

customElements.define('hcw-body-footer', HcwBodyFooter);
customElements.define('hcw-flex', HcwFlex);
customElements.define('hcw-button', HcwButton);
customElements.define('hcw-hero', HcwHero);