---
layout: page
---
{% comment %}
{%- include collection/main.html collection=site.docs -%}
{% endcomment %}

{% include data/labels.html %}

{% for label in published_labels %}
    {% for default in site.defaults %}
        {%- capture default_type -%}
        {{- default | map: 'scope' | map: 'type' | first -}}
        {%- endcapture -%}
        {%- if label != default_type -%} 
            {%- continue -%}
        {%- endif -%}
        label : {{- label -}} & type : {{- default_type -}}
        <h1>same!</h1>
        {% include data/publications.html label=label %}
        {% include data/sorted.html data=publications by="date" %}
        {% include collection/custom.html collection=reverse_sorted %}
    {% endfor %}
{% endfor %}


{% comment %}
{{ site.defaults | map: 'values' | map: 'permalink' | join: ', ' }}
{% endcomment %}