---
layout: page
---

# tags

<div class="tag-cloud-area">
    <div class="container">
        <ul class="tag-items">
        {% for tag in site.tags %}
            {%- unless tag.title == 'Index' -%}
                <li class="tag-item"><a href="{{- tag.url -}}">{{- tag.title -}}</a></li>
            {%- endunless -%}
        {% endfor %}
        </ul>
    </div>
</div>