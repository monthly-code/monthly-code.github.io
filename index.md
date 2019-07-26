---
---
<div class="home-area">
    <h1>Recent</h1>
    <ul class="home-items">
    {%- include common/data/labels.html -%}
    {%- for label in published_labels -%}
        {%- include common/data/publications.html label=label -%}
        {%- include common/data/sorted.html data=publications by="date" -%}
        <li class="home-item">
            <h3 class="home-collection-label">{{- label | escape -}}</h3>
            {%- assign items = reverse_sorted | limit: 3 -%}
            {%- include common/items.html items_name="home-collection-items" item_name="home-collection-item" items=items label=label -%}
        </li>
        {%- endfor -%}
    </ul>
</div>