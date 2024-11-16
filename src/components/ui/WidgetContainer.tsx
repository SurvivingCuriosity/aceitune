
export interface WidgetContainerProps {
    title: string;
    children: React.ReactNode;
}

export const WidgetContainer = (props: WidgetContainerProps) => {
    const { title, children } = props;
  return (
    <section className="h-full rounded-lg bg-neutral-900 p-4">
        <p className="mb-2 text-2xl font-extrabold text-olive">{title}</p>
        {children}
    </section>
  )
}
