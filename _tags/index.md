---
layout: page
---

# tags

{% for tag in site.tags %}
    {%- unless tag.title == 'Index' -%}
        <a href="/tags/{{- tag.title -}}">{{- tag.title -}}</a><br>
    {%- endunless -%}
{% endfor %}