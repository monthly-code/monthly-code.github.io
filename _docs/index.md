---
layout: page
---

{%- include common/data/labels.html -%}

<div class="collection-area">
{% for label in published_labels %}
    <ul class="collection-labels">
    {% for default in site.defaults %}
        {%- capture default_type -%}
        {{- default | map: 'scope' | map: 'type' | first -}}
        {%- endcapture -%}
        {%- if label != default_type -%} 
            {%- continue -%}
        {%- endif -%}
        <li class="collection-label">
        {%- include common/data/publications.html label=label -%}
        {%- include common/data/sorted.html data=publications by="date" -%}
        <ul class="collection-items">
        {%- for publication in reverse_sorted limit: 1 -%}
            {{publication}}
            <li class="collection-item">
                <a href="{{- publication.title | escape | downcase -}}">
                    <p class="item-categories">
                        {%- for category in publication.categories -%}
                            <span class="item-category"><a href="/categories/{{- category -}}">{{- category -}}</a></span>&nbsp;
                        {%- endfor -%}
                        |&nbsp;
                        <span class="item-date">{{- publication.date | date: "%B %d, %Y" -}}</span>
                    </p>
                    <a href="{{- publication.url -}}">
                        <p>{{- publication.title | strip_html -}}</p>
                    </a>
                    <p class="item-subtitle">
                        {{- publication.subtitle -}}
                    </p>
                    <p class="item-excerpt">
                        {{- publication.excerpt | strip_html -}}
                    </p>
                </a>
            </li>
        {%- endfor -%}
        </ul>
        </li>
    {% endfor %}
    </ul>
{% endfor %}