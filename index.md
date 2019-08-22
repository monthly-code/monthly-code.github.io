---
---
<div class="home-area">
    <h1>Newly</h1>
    {%- include common/data/labels.html -%}
    {%- assign label_size = published_labels | size -%}
    {%- if label_size > 0 -%}
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