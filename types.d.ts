declare module '*.md' {
  const md: MDX.Document;

  export default md;
}

declare module '*.mdx' {
  const mdx: MDX.Document;

  export default mdx;
}

declare namespace MDX {
  type Document = import('react').FunctionComponent<{
    components?:
      | ProviderComponents
      | ((components: ProviderComponents) => ProviderComponents);
  }>;

  // Braid's type-level strictness does not play well with dynamic ReactNodes,
  // so we simply lie to TypeScript.
  type ProviderComponent<Props = Record<string, unknown>> =
    import('react').ComponentType<{ children: any } & Props>;

  type ProviderComponents = Partial<{
    a: ProviderComponent<{ href: string; title?: string }>;
    blockquote: ProviderComponent;
    code: ProviderComponent<{ className?: string; metastring?: string }>;
    delete: ProviderComponent;
    em: ProviderComponent;
    h1: ProviderComponent<{ id: string }>;
    h2: ProviderComponent<{ id: string }>;
    h3: ProviderComponent<{ id: string }>;
    h4: ProviderComponent<{ id: string }>;
    h5: ProviderComponent<{ id: string }>;
    h6: ProviderComponent<{ id: string }>;
    hr: ProviderComponent;
    img: ProviderComponent;
    inlineCode: ProviderComponent;
    li: ProviderComponent;
    ol: ProviderComponent<{ start?: number }>;
    p: ProviderComponent;
    pre: ProviderComponent;
    span: ProviderComponent;
    strong: ProviderComponent;
    table: ProviderComponent;
    tbody: ProviderComponent;
    td: ProviderComponent<{ align: 'center' | 'left' | 'right' | null }>;
    th: ProviderComponent<{ align: 'center' | 'left' | 'right' | null }>;
    thead: ProviderComponent;
    thematicBreak: ProviderComponent;
    tr: ProviderComponent;
    ul: ProviderComponent;
    wrapper: ProviderComponent;
  }>;
}
