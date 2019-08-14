---
layout: page
---

# categories

<div class="category-cloud-area">
    <div class="container">
        <ul class="category-items">
        {% for category in site.categories %}
            {%- unless category.title == 'Index' -%}
                <li class="category-item"><a href="{{- category.url -}}">{{- category.title -}}</a></li>
            {%- endunless -%}
        {% endfor %}
        </ul>
    </div>
</div>