---
permalink: debug
---

{%- if site.host == '127.0.0.1' or site.host == '0.0.0.0' -%}

# Abstract

site host: {{ site.host | inspect }}<br>
site port: {{ site.port | inspect }}<br>
site url: {{ site.url | inspect }}<br>
site baseurl: {{ site.baseurl | inspect }}<br>

---

# Site Component Info.
site tags: {{ site.tags | inspect }}<br>
site category: {{ site.category | inspect }}<br>
site categories: {{ site.categories | inspect }}<br>
site collections: {{ site.collections | map: "label" | join: ", " }}<br>
site pages: {{ site.pages | map: "name" | join: ", " }}<br>
site defaults: {{ site.defaults | inspect }}<br>

{%- comment -%}<!-- 가능하면 보지 말 것 -->{{ site | inspect }}<br>{%- endcomment -%}
{%- comment -%}<!-- 가능하면 보지 말 것 -->{{- site.collections | inspect -}}<br>{%- endcomment -%}
{%- comment -%}<!-- 가능하면 보지 말 것 -->{{ site.pages | inspect }}<br>{% endcomment %}

---

# Site Config Info.
site title: {{ site.title | inspect }}<br>
site markdown: {{ site.markdown | inspect }}<br>

---

# Site URLs
{% include common/data/labels.html %}
{%- for label in labels -%}
    <h2>{{- label -}}</h2>
    {%- comment -%} All URLs {%- endcomment -%}
    {%- assign publications = site[label] -%}
    {%- if publications -%}
        <ul>
        {%- for publication in publications -%}
            <li><p>{{- site.url -}}{{- site.baseurl -}}{{- publication.url -}}</p></li>
        {%- endfor -%}
        </ul>
    {%- endif -%}
{%- endfor -%}

{%- endif -%}