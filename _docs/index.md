---
layout: page
---

{%- include common/data/labels.html -%}

<div class="collection-area">
{% for label in published_labels %}
    {%- assign check_loop = false -%}
    {% for default in site.defaults %}
        {%- capture default_type -%}
        {{- default | map: 'scope' | map: 'type' | first -}}
        {%- endcapture -%}
        {%- if label != default_type -%} 
            {%- continue -%}
        {%- endif -%}
        {%- unless check_loop -%}
        {%- assign check_loop = true -%}
        <ul class="collection-labels">
        {%- endunless -%}
        <li class="collection-label">
        {%- include common/data/publications.html label=label -%}
        {%- include common/data/sorted.html data=publications by="date" -%}
        {%- include common/items.html items=reverse_sorted label=label limit=1 -%}
        </li>
    {% endfor %}
    {%- if check_loop -%}
    </ul>
    {%- endif -%}
{% endfor %}