// Recursive helper for finding path parameters in the absence of wildcards
type _PathParam<Path extends string> =
  // split path into individual path segments
  Path extends `${infer L}/${infer R}`
  ? _PathParam<L> | _PathParam<R>
  : // find params after `:`
  Path extends `:${infer Param}`
  ? Param extends `${infer Optional}?`
  ? Optional
  : Param
  : // otherwise, there aren't any params present
  never;

type PathParam<Path extends string> =
  // check if path is just a wildcard
  Path extends "*" | "/*"
  ? "*"
  : // look for wildcard at the end of the path
  Path extends `${infer Rest}/*`
  ? "*" | _PathParam<Rest>
  : // look for params in the absence of wildcards
  _PathParam<Path>;

export function generatePath<Path extends string>(
  originalPath: Path,
  params: {
    [key in PathParam<Path>]: string | null;
  } = {} as any
): string {
  let path: string = originalPath;
  if (path.endsWith("*") && path !== "*" && !path.endsWith("/*")) {
    path = path.replace(/\*$/, "/*") as Path;
  }

  // ensure `/` is added at the beginning if the path is absolute
  const prefix = path.startsWith("/") ? "/" : "";

  const stringify = (p: any) =>
    p == null ? "" : typeof p === "string" ? p : String(p);

  const segments = path
    .split(/\/+/)
    .map((segment, index, array) => {
      const isLastSegment = index === array.length - 1;

      // only apply the splat if it's the last segment
      if (isLastSegment && segment === "*") {
        const star = "*" as PathParam<Path>;
        // Apply the splat
        return stringify(params[star]);
      }

      const keyMatch = segment.match(/^:(\w+)(\??)$/);
      if (keyMatch) {
        const [, key, optional] = keyMatch;
        let param = params[key as PathParam<Path>];
        if (optional !== "?" || param === null) console.error(`Missing ":${key}" param`);
        return stringify(param);
      }

      // Remove any optional markers from optional static segments
      return segment.replace(/\?$/g, "");
    })
    // Remove empty segments
    .filter((segment) => !!segment);

  return prefix + segments.join("/");
}
