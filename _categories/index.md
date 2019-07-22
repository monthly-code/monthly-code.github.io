---
layout: page
---

# categories

{% for category in site.categories %}
    {%- unless category.title == 'Index' -%}
        <a href="/categories/{{- category.title -}}">{{- category.title -}}</a><br>
    {%- endunless -%}
{% endfor %}