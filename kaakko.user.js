// ==UserScript==
// @name            Kaakon Viestintä CMS: Subscriber only articles lock icon
// @name:fi         Kaakon Viestintä CMS: Lukko-ikoni vain tilaajille tarkoitetuissa artikkeleissa
// @namespace       https://www.kissakala.fi
// @version         1.0.1
// @description     Shows lock icon next to the subscriber only articles in Kaakon Viestintä CMS. Only Länsi-Savo, Itä-Savo and Kouvolan Sanomat supported, for now.
// @description:fi  Näyttää lukko-ikonin vain tilaajien luettavissa olevien artikkelien kohdalla Länsi-Savon, Itä-Savon ja Kouvolan Sanomien verkkopalveluissa
// @author          Jani Haiko
// @match           https://www.lansi-savo.fi/*
// @match           https://www.ita-savo.fi/*
// @match           https://www.kouvolansanomat.fi/*
// @grant           none
// @run-at          document-end
// @iconURL         https://www.lansi-savo.fi/favicon.ico
// @source          https://github.com/ojaha065/subscriberLockIcon
// @supportURL      https://github.com/ojaha065/subscriberLockIcon/issues
// @updateURL       https://github.com/ojaha065/subscriberLockIcon/raw/main/kaakko.user.js
// @downloadURL     https://github.com/ojaha065/subscriberLockIcon/raw/main/kaakko.user.js
// ==/UserScript==

(function() {
    "use strict";

    const imgElem = document.createElement("img");
    imgElem.src = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIyNCIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTEwMjguNCkiPjxwYXRoIGQ9Im01IDEwMzcuNGMtMS4xMDQ2IDAtMiAwLjktMiAydjEgNiAxYzAgMS4xIDAuODk1NCAyIDIgMmgyIDEwIDJjMS4xMDUgMCAyLTAuOSAyLTJ2LTctMWMwLTEuMS0wLjg5NS0yLTItMmgtMi0xMnoiIGZpbGw9IiNmMWM0MGYiLz48cGF0aCBkPSJtNSAxMDQwLjRjLTEuMTA0NiAwLTIgMC45LTIgMnYxIDYgMWMwIDEuMSAwLjg5NTQgMiAyIDJoMiAxMCAyYzEuMTA1IDAgMi0wLjkgMi0ydi03LTFjMC0xLjEtMC44OTUtMi0yLTJoLTItMTJ6IiBmaWxsPSIjZjM5YzEyIi8+PHBhdGggZD0ibTEyIDEwMjkuNGMtMy44NjYgMC03IDMuMS03IDdoM2MwLTIuMiAxLjc5MDktNCA0LTQgMi4yMDkgMCA0IDEuOCA0IDRoM2MwLTMuOS0zLjEzNC03LTctN3oiIGZpbGw9IiNiZGMzYzciLz48cGF0aCBkPSJtNSAxNHYxaDE0di0xaC0xNHptMCAydjFoMTR2LTFoLTE0em0wIDJ2MWgxNHYtMWgtMTR6bTAgMnYxaDE0di0xaC0xNHoiIGZpbGw9IiNlNjdlMjIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMTAyOC40KSIvPjxwYXRoIGQ9Im01IDEwMzcuNHYxYzAgMC41IDAuNjcxNiAxIDEuNSAxczEuNS0wLjUgMS41LTF2LTFjMCAwLjUtMC42NzE2IDEtMS41IDFzLTEuNS0wLjUtMS41LTF6IiBmaWxsPSIjN2Y4YzhkIi8+PHBhdGggZD0ibTE2IDEwMzcuNHYxYzAgMC41IDAuNjcyIDEgMS41IDFzMS41LTAuNSAxLjUtMXYtMWMwIDAuNS0wLjY3MiAxLTEuNSAxcy0xLjUtMC41LTEuNS0xeiIgZmlsbD0iIzdmOGM4ZCIvPjxwYXRoIGQ9Im0xMiAyLjQzNzVjLTAuMzUxIDAtMC42OTkgMC4wMzM4LTEuMDMxIDAuMDkzNy0wLjI0NyAwLjA0NDYtMC40ODcgMC4xMTI5LTAuNzE5IDAuMTg3Ni0wLjIxNyAwLjA2OTgtMC40MjI5IDAuMTU2MS0wLjYyNSAwLjI1LTAuMTA2IDAuMDQ5Mi0wLjIxMDkgMC4xMDA4LTAuMzEyNSAwLjE1NjItMC4xMzE5IDAuMDcxOS0wLjI1MTMgMC4xNjgyLTAuMzc1IDAuMjUtMC4xMTU4IDAuMDc2NS0wLjIzNTYgMC4xMzQyLTAuMzQzNyAwLjIxODgtMC4xNDA3IDAuMTA5Ny0wLjI3OTkgMC4yMjExLTAuNDA2MyAwLjM0MzctMC4wMzY5IDAuMDM2Mi0wLjA1ODEgMC4wODc4LTAuMDkzNyAwLjEyNS0wLjE2ODQgMC4xNzQ0LTAuMzMxMyAwLjMzNTYtMC40Njg4IDAuNTMxMy0wLjE0MDIgMC4xOTkzLTAuMjcwNCAwLjQwNjUtMC4zNzUgMC42MjUtMC4wMDQgMC4wMDg0IDAuMDA0IDAuMDIyNyAwIDAuMDMxMi0wLjExMTEgMC4yMzU5LTAuMjE1OSAwLjQ5NTktMC4yODEyIDAuNzUtMC4yNTMgMC41ODQ0LTAuOTQyNCAxLTEuNzUgMS0wLjA2IDAtMC4wODMyIDAuMDAxOC0wLjEyNSAwLTAuMDEwNS0wLjAwMDQtMC4wMTY4IDAuMDAxNC0wLjAzMTMgMGwtMC4wNjI1IDF2MSAxaDN2LTEtMWMwLTAuMjc2MSAwLjA0MDUtMC41NTIxIDAuMDkzOC0wLjgxMjUgMC4zNzI5LTEuODIyNyAxLjk3MzItMy4xODc1IDMuOTA2Mi0zLjE4NzUgMi4yMDkgMCA0IDEuNzkwOSA0IDR2MSAxaDN2LTEtMWwtMC4wNjItMWMtMC4wMTUgMC4wMDE0LTAuMDIxLTAuMDAwNC0wLjAzMiAwaC0wLjEyNWMtMC44MDcgMC0xLjQ5Ny0wLjQxNTYtMS43NS0xLTAuMDY1LTAuMjU0MS0wLjE3LTAuNTE0MS0wLjI4MS0wLjc1LTAuMDA0LTAuMDA4NSAwLjAwNC0wLjAyMjggMC0wLjAzMTItMC4xMDUtMC4yMTg1LTAuMjM1LTAuNDI1Ny0wLjM3NS0wLjYyNS0wLjEzOC0wLjE5NTctMC4zLTAuMzU2OS0wLjQ2OS0wLjUzMTMtMC4wMzYtMC4wMzgtMC4wNTUtMC4wODgxLTAuMDk0LTAuMTI1LTAuMTI2LTAuMTIyNi0wLjI2NS0wLjIzNC0wLjQwNi0wLjM0MzctMC4xMDQtMC4wODE3LTAuMjMyLTAuMTQ0OC0wLjM0NC0wLjIxODgtMC4xMjItMC4wODA5LTAuMjQ0LTAuMTc4OC0wLjM3NC0wLjI1LTAuMTAxLTAuMDU1LTAuMjA4LTAuMTA3NC0wLjMxMy0wLjE1NjItMC4yMDItMC4wOTM5LTAuNDA4LTAuMTgwMi0wLjYyNS0wLjI1LTAuMjMyLTAuMDc0Ny0wLjQ3Mi0wLjE0My0wLjcxOS0wLjE4NzYtMC4zMzItMC4wNTk5LTAuNjgtMC4wOTM3LTEuMDMxLTAuMDkzN3oiIGZpbGw9IiM5NWE1YTYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMTAyOC40KSIvPjwvZz48L3N2Zz4=";
    imgElem.width = 24;
    imgElem.height = 24;
    imgElem.alt = "Subscribers only";
    imgElem.style.marginRight = "5px";

    document.querySelectorAll(".card.is--subscriber-only .card__link, .article-list__item.is--subscriber-only .article-list__item-title").forEach(elem => {
        elem.prepend(imgElem.cloneNode(false));
    });
})();