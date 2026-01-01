document.addEventListener('DOMContentLoaded', function () {
	const toggle = document.querySelector('.nav-toggle');
	const drawer = document.querySelector('.side-drawer');
	const overlay = document.querySelector('.drawer-overlay');
	const closeBtn = document.querySelector('.drawer-close');

	function openDrawer() {
		drawer.classList.add('open');
		overlay.classList.add('open');
		overlay.hidden = false;
		toggle.classList.add('open');
		drawer.setAttribute('aria-hidden', 'false');
	}

	function closeDrawer() {
		drawer.classList.remove('open');
		overlay.classList.remove('open');
		overlay.hidden = true;
		toggle.classList.remove('open');
		drawer.setAttribute('aria-hidden', 'true');
	}

	if (toggle && drawer && overlay) {
		toggle.addEventListener('click', function () {
			const opened = drawer.classList.contains('open');
			if (opened) closeDrawer(); else openDrawer();
		});

		overlay.addEventListener('click', closeDrawer);
	}

	if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

	// Close drawer when navigation link is clicked (useful for single-page nav)
	document.querySelectorAll('.side-drawer a').forEach(a => {
		a.addEventListener('click', () => closeDrawer());
	});

	// Scrollspy: highlight nav links based on section in view
	const navLinks = document.querySelectorAll('.navbar a');
	const sideLinks = document.querySelectorAll('.side-drawer a');
	const sections = Array.from(document.querySelectorAll('section[id]'));

	if ('IntersectionObserver' in window) {
		const obs = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				const id = entry.target.id;
				const selector = `.navbar a[href="#${id}"]`;
				const link = document.querySelector(selector);
				if (entry.isIntersecting) {
					document.querySelectorAll('.navbar a').forEach(n => n.classList.remove('active'));
					if (link) link.classList.add('active');
				}
			});
		}, { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 });

		sections.forEach(s => obs.observe(s));
	}
});
