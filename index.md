---
---
<div class="home-area">
    <h1>Newly</h1>
    <ul class="home-items">
    {%- include common/data/labels.html -%}
    {%- for label in published_labels -%}
        {%- include common/data/publications.html label=label -%}
        {%- include common/data/sorted.html data=publications by="date" -%}
        <li class="home-item">
            {%- include common/items.html items=reverse_sorted label=label limit=1 -%}
        </li>
        {%- endfor -%}
    </ul>
</div>