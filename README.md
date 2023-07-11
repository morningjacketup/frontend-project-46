### Hexlet tests and linter status:

[![Actions Status](https://github.com/morningjacketup/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/morningjacketup/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/bfe460edab1182a35856/maintainability)](https://codeclimate.com/github/morningjacketup/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/bfe460edab1182a35856/test_coverage)](https://codeclimate.com/github/morningjacketup/frontend-project-46/test_coverage)

Вычислитель отличий – программа, определяющая разницу между двумя структурами данных. Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменении в конфигурационных файлах.

Пример работы приложения(Stylish format)

[![asciicast](https://asciinema.org/a/ajUzLZGydnSs0cyZ4X1ESuAjC.svg)](https://asciinema.org/a/ajUzLZGydnSs0cyZ4X1ESuAjC)

Пример работы приложения(Plain format)

[![asciicast](https://asciinema.org/a/beYBHrM9lMtNtriBcIB4kr787.svg)](https://asciinema.org/a/beYBHrM9lMtNtriBcIB4kr787)

Пример работы приложения(Json format)

[![asciicast](https://asciinema.org/a/YjlwUD2FV8uFCOV3QDK8SQ5ve.svg)](https://asciinema.org/a/YjlwUD2FV8uFCOV3QDK8SQ5ve)

## How to install:

```
  Requires:
-Node v.18
  git clone git@github.com:morningjacketup/frontend-project-46.git
```

## How to use:

```
  node bin/gendiff.js -options filepath1 filepath2
  make gendiff
```

## Options:

```
  -h, --help справочная информация
  -f, --format выбор формата для вывода различий
  -v, --version версия утилиты
```

## Formats:

```
  stylish форматер по умолчанию
  plain вывод результата в формате plain
  json вывод результата в формате json
```
