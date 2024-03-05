
git submodule init
git submodule update

cd synthea && ./run_synthea -p 100 --exporter.baseDirectory="../"
