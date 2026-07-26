type SkillMarqueeProps = {
	items: readonly string[];
};

export function SkillMarquee({ items }: SkillMarqueeProps) {
	return (
		<div
			className='skill-marquee'
			role='group'
			aria-label={items.join(', ')}
		>
			<div className='skill-marquee__track'>
				{[0, 1].map(group => (
					<div className='skill-marquee__group' aria-hidden='true' key={group}>
						{items.map(item => (
							<span className='skill-marquee__item' key={item}>
								<span>{item}</span>
								<span className='skill-marquee__dot'>·</span>
							</span>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
