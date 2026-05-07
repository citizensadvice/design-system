---
title: Configuring Dependabot
order: 4
---

The Citizens Advice Design System is made up of a gem and a npm package which need to be updated together. When configuring [Dependabot](https://docs.github.com/en/code-security/concepts/supply-chain-security/about-dependabot-security-updates) you can use [multi-ecosystem groups](https://docs.github.com/en/code-security/concepts/supply-chain-security/multi-ecosystem-updates) to group updates together when there is a new design system release.

An example set up for a Rails project might look like this:

```yml
version: 2

multi-ecosystem-groups:
  design-system:
    schedule:
      interval: weekly
      timezone: Europe/London

updates:
  # Design system multi-ecosystem groups
  - package-ecosystem: bundler
    directory: "/"
    patterns:
      - "citizens_advice_components"
    multi-ecosystem-group: "design-system"

  - package-ecosystem: npm
    directory: "/"
    patterns:
      - "@citizensadvice/design-system"
    multi-ecosystem-group: "design-system"

  - package-ecosystem: bundler
    directory: "/"
    schedule:
      interval: weekly
      timezone: Europe/London
    cooldown:
      default-days: 5
    ignore:
      # Design system updates are handled via the multi-ecosystem-group
      - dependency-name: "citizens_advice_components"

- package-ecosystem: npm
    directory: "/"
    schedule:
      interval: weekly
      timezone: Europe/London
    cooldown:
      default-days: 5
    ignore:
      # Design system updates are handled via the multi-ecosystem-group
      - dependency-name: "@citizensadvice/design-system"
```
