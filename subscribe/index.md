---
layout: text
title: "Подписка на обновления"
---

## Подписка на обновления

```
    {{ "/feed.xml" | absolute_url }}
```

У сайта есть [Atom-лента]({{ "/feed.xml" | relative_url }}), которую можно добавить в RSS-читалку, например
 - [feedly](https://feedly.com/)
 - [RSS Reader](https://play.google.com/store/apps/details?id=com.madsvyat.simplerssreader&hl=ru_RU) для Android
 - [Blogtrottr](https://blogtrottr.com/?subscribe={{ site.url }}/feed.xml) &mdash; отправка новостей с ленты на почту
