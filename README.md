# Mosdule

A OS simulator written in JavaScript, CSS and HTML. Modular, with its
applications, like a Linux system.

## Inner workings

Mosdule is made up of different scripts that mimic applications.
All together form the entire desktop. Each application can have several
instances called processes.

At the start the OS calls a init function which starts some basic required
applications like the WindowManager.

Applications can make requests to the OS for specific things. And can access
flags they were called with.

The OS also has environment variables to make if easy for applications to share
settings. For example the Window Manager creates a environment variable with its
itself so other applications can make windows with it, by accessing that var.

## Current available applications

> [!INFO]
> Some here are in the OS but not directly visible to users. For example the
> Window manager. You can't start it yourself the OS does it for you.

- Docki.js (App select dock at bottom)
- ImageViewer.js (An image viewer. Currently used for the background)
- Intro.js (The intro opened at the start)
- jsBar.js (The top bar of the desktop with the time and date)
- NetifyBrowser.js (A iframe 'webbrowser' currently only showing selected
    websites bc security. But all things are implemented for search, just hidden)
- Test.js (An application to test some things)
- WindowManager.js (The window manager)

## Running it yourself?

This project can be hosted on any http server. No special setup required.

## Credits

The icons are from the Adwaita-icon-theme by the Gnome project.

The background is from [Yuriy Chemerys](https://unsplash.com/@ychemerys?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
on [Unsplash](https://unsplash.com/photos/selective-focus-photography-of-orange-fox-during-daytime-BTzQWyRK474?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
