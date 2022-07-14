import { NodeRendererType } from "@graphcms/rich-text-react-renderer";

export const defaultContentRenderer : NodeRendererType = {
	h1: ({ children }) => <h1 className="text-xl font-bold">{children}</h1>,
	a: ({ children, href, openInNewTab }) => (
		<a
			href={href}
			target={openInNewTab ? '_blank' : '_self'}
			style={{
				color: 'green'
			}}
			rel="noreferrer"
		>
			{children}
		</a>
	),
	bold: ({ children }) => <strong>{children}</strong>,
	img: props => (
		<div className="p-8">
			<img
				alt={props?.altText}
				height={props?.height}
				width={props?.width}
				src={props.src}
			/>
		</div>
	)
};
