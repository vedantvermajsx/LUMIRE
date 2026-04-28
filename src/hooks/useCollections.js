import { useState, useEffect } from 'react';
import { collectionsService } from '../services';
import { mockCollections, mockFeatured } from '../config/mockData';
import appConfig from '../config/env';

/**
 * useCollections
 * In dev: returns mock data immediately (no network call)
 * In prod: fetches from the real API via CollectionsService
 */
export function useCollections(params = {}) {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchCollections() {
      setLoading(true);
      setError(null);

      try {
        const data = await collectionsService.getAllCollections(params);
        if (!cancelled) setCollections(data?.collections || data || []);
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchCollections();
    return () => { cancelled = true; };
  }, [JSON.stringify(params)]);

  return { collections, loading, error };
}

/**
 * useFeaturedCollections
 */
export function useFeaturedCollections() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchFeatured() {
      setLoading(true);
      setError(null);

      try {
        const data = await collectionsService.getFeaturedCollections();
        // Return first 3 for featured if the backend doesn't handle it
        const list = data?.collections || data || [];
        if (!cancelled) setFeatured(list.slice(0, 3));
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchFeatured();
    return () => { cancelled = true; };
  }, []);

  return { featured, loading, error };
}

export function useCollectionById(id) {
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function fetchCollection() {
      setLoading(true);
      setError(null);

      try {
        const data = await collectionsService.getCollectionById(id);
        if (!cancelled) setCollection(data);
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchCollection();
    return () => { cancelled = true; };
  }, [id]);

  return { collection, loading, error };
}
