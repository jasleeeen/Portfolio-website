import { lazy, Suspense } from "react";

export default function LazySection(importer) {
  const Component = lazy(importer);

  return (
    <Suspense fallback={null}>
      <Component />
    </Suspense>
  );
}