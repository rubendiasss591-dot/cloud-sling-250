export const META_PIXEL_ID = "1666536764962622";

export const metaPixelScript = String.raw`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');
`;

type MetaPixelWindow = Window & {
  fbq?: (command: "track", event: "InitiateCheckout") => void;
};

export function trackInitiateCheckout() {
  (window as MetaPixelWindow).fbq?.("track", "InitiateCheckout");
}
