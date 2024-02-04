### Ejecutar el proyecto
<pre>docker-compose -f local.yml up</pre>

### Ejecutar django aparte
<pre>docker kill id_container</pre>
<pre>docker-compose run --rm --service-ports django python manage.py shell_plus --settings=sgventas.settings.develop</pre>

### fixture generar y cargar datos
<pre>docker-compose -f .\local.yml run --rm --service-ports django python manage.py dumpdata branches.Branch  --settings=sgventas.settings.develop</pre>
<pre> docker-compose -f .\local.yml run --rm --service-ports  django python manage.py loaddata fixtures/Branch.json --app branches.Branch --settings=sgventas.settings.develop</pre>