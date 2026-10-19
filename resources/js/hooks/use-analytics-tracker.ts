import { useEffect } from 'react';
import { visit } from '@/routes/analytics';

export function useAnalyticsTracker() {
    useEffect(() => {
        const hasVisited = sessionStorage.getItem('has_visited');

        if (!hasVisited) {
            fetch(visit().url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                },
            })
            .then(() => {
                sessionStorage.setItem('has_visited', 'true');
            })
            .catch((err) => console.error('Analytics tracking failed:', err));
        }
    }, []);
}