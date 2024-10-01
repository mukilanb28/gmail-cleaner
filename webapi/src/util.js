export function extractEmailAddress(fromHeader) {
	const emailRegex = /<(.+?)>/;
	const match = emailRegex.exec(fromHeader);
	return match ? match[1] : fromHeader;
}

export function extractDomainAddress(fromHeader) {
	const domainRegex = /@([\w.-]+)/;
	const match = domainRegex.exec(fromHeader);
	return match ? match[1] : fromHeader;
}
