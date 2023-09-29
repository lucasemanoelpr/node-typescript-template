## Installation on Linux

First install sdk-man here: https://sdkman.io/

After installation, run the command bellow to install this specific scala version

```bash
sdk install scala 2.12.12
```

then:

```bash
sdk install sbt 1.4.1
```

## Execution

```bash
sbt
```

Run the tests with the following command:

```bash
gatling:testOnly main.StatusTest
```

or on project root

```bash
npm run load-tests test-name
```

## References

https://gatling.io/docs/current/quickstart/
