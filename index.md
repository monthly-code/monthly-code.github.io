---
layout: default
---
<div class="home-area">
    <h1>Newly</h1>
    {%- include common/data/labels.html -%}
    {%- assign total_size = 0 -%}
    {%- for label in published_labels -%}
        {%- include common/data/publications.html label=label -%}
        {%- assign publication_size = publications | size -%}
        {%- assign total_size = total_size | plus: publication_size -%}
    {%- endfor -%}
    {%- if total_size > 0 -%}
        <ul class="home-items">
        {%- for label in published_labels -%}
            {%- include common/data/publications.html label=label -%}
            {%- include common/data/sorted.html data=publications by="date" -%}
            <li class="home-item">
                {%- include common/items.html items=reverse_sorted label=label limit=1 -%}
            </li>
            {%- endfor -%}
        </ul>
    {%- else -%}
        <div class="home-empty">
            See you soon!
        </div>
    {%- endif -%}
</div>