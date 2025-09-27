export default function ContactSection() {
  const contactMethods = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          {/* Map Pin */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21c4.97-5.373 9-9.373 9-13.5C21 4.358 16.97 1 12 1S3 4.358 3 7.5C3 11.627 7.03 15.627 12 21z"
          />
          <circle cx="12" cy="7.5" r="2.5" />
        </svg>
      ),
      title: "Our Address",
      desc: "Pinaod, San Ildefonso Bulacan",
      link: {
        name: "View on Google Maps",
        href: "https://maps.google.com/?q=123+Main+Street,+Quezon+City,+Philippines",
      },
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          {/* Envelope */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l9 6 9-6M4.5 6h15a1.5 1.5 0 011.5 1.5v9a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 16.5v-9A1.5 1.5 0 014.5 6z"
          />
        </svg>
      ),
      title: "Email Us",
      desc: "We usually respond within 365 days.",
      link: {
        name: "Send an Email",
        href: "mailto:info@example.com",
      },
    },
  ];
  return (
    <section className="py-25">
      <div className="w-full mx-auto px-4  gap-12 md:px-8 lg:flex">
        <div className="max-w-md">
          <h3 className="text-3xl font-semibold sm:text-4xl">Contact Us</h3>
          <p className="mt-3">
            We’re here to help and answer any question you might have, We look
            forward to hearing from you .
          </p>
        </div>
        <div>
          <ul className="mt-12 gap-y-6 gap-x-12 items-center md:flex lg:gap-x-0 lg:mt-0">
            {contactMethods.map((item, idx) => (
              <li
                key={idx}
                className="space-y-3 border-t py-6 md:max-w-sm md:py-0 md:border-t-0 lg:border-l lg:px-12 lg:max-w-none"
              >
                <div className="w-12 h-12 rounded-full border flex items-center justify-center ">
                  {item.icon}
                </div>
                <h4 className=" text-lg font-medium xl:text-xl">
                  {item.title}
                </h4>
                <p>{item.desc}</p>
                <a
                  href={item.link.href}
                  className="flex items-center gap-1 text-sm text-green-600 duration-150 hover:text-green-400 font-medium"
                >
                  {item.link.name}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
