Accordion Component

To use this component first verify the following:

- Components Module is installed and enabled. ( https://www.drupal.org/project/components ) 

- Project's theme .info.yml file defines the uswds components path

component-libraries:
  uswds:
    paths:
     - components


To include the accordion component in a Drupal Template:
- Use the include tag and the path to the component
- Set the accordion var
- Use 'with' word to include the variable 'accordion' 

{% include  "@uswds/accordion/accordion.twig" with  {'accordion': accordion} %}

Example:
1) Make a copy of block.html.twig template

2) Rename block.html.twig template. 
In this example I rename it  block--prudentia-page-title.html.twig

3) Replace the template code with this     

    {% set accordion = {
            'id_prefix': "abc-",
            'variant': "default",
            'multiselectable': false,
            'items':[
                {'id': '1',
                'content': 'This is the first accordion tab',
                'title': 'First Tab',
                'expanded': 'false',
                },
                {
                'id':  '2',
                'content': 'This is the second accordion tab',
                'title': 'Second Tab',
                },
            ],
    }%}

    <div>
    {% include "@uswds/accordion/accordion.twig" with {'accordion': accordion}  %}
    </div>

Please note that the value of  the  'id_prefix' should be unique to avoid conflicts with any other ID element in the page 