---
---

# home

<div class="home-area">
    <h1>Recent</h1>
    <ul class="home-list">
    {%- include common/data/labels.html -%}
    {%- for label in published_labels -%}
        {%- include common/data/publications.html label=label -%}
        {%- include common/data/sorted.html data=publications by="date" -%}
        <li class="home-item">
            <h3 class="home-collection-label">{{- label | escape -}}</h3>
            {%- assign items = reverse_sorted | limit: 3 -%}
            {%- include common/items.html items_name="home-collection-items" item_name="home-colleciton-item" items=items label=label -%}
        </li>
        {%- endfor -%}
    </ul>
    <hr>
    <!-- 최근 인기 있었던( 이걸 어떻게 찾아내지..? google analytics 면 가능할까? ) 3개의 category마다 각각 글 1개씩 추천 -->
    <h3>Categories</h3>
    {% capture all_categories %}
    {%- assign filtered_collection = site.collections | where_exp: "item", "item.label != 'posts'" | where_exp: "item", "item.label != 'photos'" -%}
    {%- for collection in filtered_collection -%}
        {%- assign categories_list = site[collection.label] | where_exp: "item", "item.title != 'Index'" | map: 'categories' -%}
        {%- for categories_item in categories_list -%}
            {%- assign count = categories_item | size -%}
            {%- if count < 1 -%}
                {%- continue -%}
            {%- endif -%}
            {%- for category_item in categories_item -%}
                {{- categories | append: category_item -}}
                {%- unless forloop.last -%}
                    {{- categories | append: ',' -}}
                {%- endunless -%}
            {%- endfor -%}
            {%- unless forloop.last -%}
                {{- categories | append: ',' -}}
            {%- endunless -%}
        {%- endfor -%}
    {%- endfor -%}
    {% endcapture %}
    {%- assign uniq_categories = all_categories | split: ',' | uniq -%}
    <ul class="home-list">
    {%- for category in uniq_categories -%}
        <li class="home-item">
            <h3 class="home-categories-title">{{category}}</h3>
            {%- assign filtered_collection = site.collections | where_exp: "item", "item.label != 'posts'" | where_exp: "item", "item.label != 'photos'" -%}
            <ul class="home-categories-list">
            {%- for collection in filtered_collection -%}
                {% assign collection_list = site[collection.label] | where_exp: "item", "item.title != 'Index'" | sort: "date" %}
                {%- for collection_item in collection_list -%}
                    {%- assign is_category = collection_item.categories | split: ',' | map: category | compact | size -%}
                    {%- if is_category < 1 -%}
                        {%- continue -%}
                    {%- endif -%}
                    <li class="home-categories-item">
                        <p>{{ collection_item.categories | join: ", " }}</p>
                        <a href="{{ collection_item.url }}">
                            <p>{{ collection_item.title | escape }}</p>
                        </a>
                        <p>{{ collection_item.tags | join: ", " }}</p>
                        <p>{{ collection_item.date | date: "%B %d, %Y"}}</p>
                    </li>
                    {%- break -%}
                {%- endfor -%}
                {%- if is_category > 0 -%}
                    {%- break -%}
                {%- endif -%}
            {%- endfor -%}
            </ul>
        </li>
    {%- endfor -%}
    </ul>
</div>