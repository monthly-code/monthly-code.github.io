---
permalink: /debug
---

{%- if site.host == '127.0.0.1' or site.host == '0.0.0.0' -%}

# Abstract

site host: {{ site.host | inspect }}<br>
site port: {{ site.port | inspect }}<br>
site url: {{ site.url | inspect }}<br>
site baseurl: {{ site.baseurl | inspect }}<br>

---

site tags: {{ site.tags | inspect }}<br>
site category: {{ site.category | inspect }}<br>
site categories: {{ site.categories | inspect }}<br>
{%- comment -%}<!-- 가능하면 보지 말 것 -->{{- site.collections | inspect -}}{%- endcomment -%}
site collections: {{ site.collections | map: "label" | join: ", " }}<br>
{%- comment -%}{{ site.pages | inspect }}{%- endcomment -%}
site pages: {{ site.pages | map: "name" | join: ", " }}<br>

---

site title: {{ site.title | inspect }}

---

site debug : {{ site | inspect }}

{%- comment -%}
site debug : {{ site | inspect }}
{%- endcomment -%}

{%- endif -%}