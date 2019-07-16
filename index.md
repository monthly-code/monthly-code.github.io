---
---

# home

<div class="home-area">
    <h1>Recent</h1>
    <ul class="home-list">
    {%- include data/labels.html -%}
    {%- for label in published_labels -%}
        {%- include data/publications.html label=label -%}
        {%- include data/sorted.html data=publications by="date" -%}
        <li class="home-item">
            <h3 class="home-collection-title">{{- label | escape -}}</h3>
            <ul class="home-collection-list">
            {%- for publication in reverse_sorted limit: 3 -%}
                <li class="home-collection-item">
                    <p><em>{{- label -}}</em> | <em>{{- publication.date | date: "%B %d, %Y" -}}</em></p>
                    {%- for category in publication.categories -%}
                        <a href="/categories/{{- publication.category -}}">{{- category -}}</a>
                    {%- endfor -%}
                    <a href="{{- publication.url -}}">
                        <p>{{- publication.title | strip_html -}}</p>
                    </a>
                    <p>{{- publication.excerpt | strip_html -}}</p>
                    {%- comment -%}<p>{{- publication.tags | join: ", " -}}</p>{%- endcomment -%}
                </li>
            {%- endfor -%}
            </ul>
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