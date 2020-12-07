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
    {% for post in site.categories.news %}
        {% unless post.past %}
        {% assign have_posts = true %}
            <li class="cards__item">
                <div class="card">
                    <div class="card__plain-text">
                        <small>Новости / Реклама</small>
                        <h2>{{ post.title }}</h2>
                        {{ post.content }}
                    </div>
                </div>
            </li>
        {% endunless %}
    {% endfor %}
{% endcapture %}
    
{% if have_posts %}  
<ul class="cards">
    {{ posts }}
</ul>
{% endif %}
