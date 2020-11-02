---
layout: default
---

{% assign have_posts = false %}  
{% capture posts %}  
    {% for post in site.categories.session %}
        {% if post.session %}
            {% unless post.session.past %} 
            {% assign have_posts = true %}
            <li class="cards__item">
                {% include card.html session=post.session %}
            </li>
         {% endunless %}   
        {% endif %}
    {% endfor %}
{% endcapture %}
    
{% if have_posts %}  
<ul class="cards">
    {{ posts }}
</ul>
{% endif %}
