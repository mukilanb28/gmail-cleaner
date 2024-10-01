import { FC, ImgHTMLAttributes } from 'react';

export interface IIconProps extends ImgHTMLAttributes<HTMLImageElement> {
	src: string;
}

export const SvgIcon: FC<IIconProps> = ({ title, alt, ...props }) => {
	return (
		<img
			{...props}
			title={title}
			alt={alt ?? title}
		/>
	);
};
