# Browser Support list

When using Browserstack, you need to be aware that whilst almost **any** browser configuration is theoretically possible,
you will encounter a _lot of issues_ if you use one outside of this current supported list.

**NB: This supported list is NOT the same as what browsers are tested.**

## Operating Systems

Here you must split up the Operating System into its "type" and version. For regular machines/devices the following
combinations are supported.

- Windows 7
- Windows 8.1
- Windows 10
- OSX Catalina (13) - _NB: This doesn't like working on certain pages, there are several issues with `safaridriver`
- OSX Mojave (12)
- Android Q (10)
- Android Pie (9) - _NB: This one is likely not to work as intended, due to the hardware restrictions - Use at own risk_
- iOS 13
- iOS 12
- iOS 11

## Browsers

- Chrome 80-83 - **NB: Version 82 doesn't exist!**
- Chrome 77-79 - **NB: Only use with Mojave and Windows**
- Firefox 60+ - With `geckodriver 0.26.0` and above
- Firefox 57-59 - With `geckodriver 0.25.0`
- Edge 81/83 - _NB: These are now tied into the Chromium version support, but 79/80 were the "flip-flop" versions_
- Safari 12 - **Always use Mojave**
- Safari 13 - **Always use Catalina** - note this is flaky on heavy JS pages
- IE 11 - **See below for more detailed info**

### IE11

IE11 is a very fragile browser. Due to a variety of reasons, it often will fail sporadically. As such you should treat
it with a bit more care / attention. Ideally we should look to remove it from the testing process as early as possible.

When Edge began its development cycle as Project Spartan, initially it had the same issues. Whilst this may not be a
primary reason, Microsoft decided to switch to the Chromium engine. As such flaky issues seen in the old Non-W3C Edge
(v15-18), are no longer seen in the Chromium versions after version 80.

IE11 is best used on Windows 7, but is supported on all Windows versions. If you use IE11 on Windows 8.1, you need to
configure it a lot so it's best to just avoid using it on anything aside Windows 7 if possible.

IE11 has a plethora of config options available inside the `options` key inside driver instantiation. Most of these are
often noted to be "flaky", but actually some of them will make your driver work better, dependent on what the
AUT looks/behaves like.
