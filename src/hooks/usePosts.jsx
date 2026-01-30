import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function usePosts({ published = true, categorySlug = null, limit = null } = {}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, [published, categorySlug, limit]);

  async function fetchPosts() {
    try {
      setLoading(true);
      let query = supabase
        .from('posts')
        .select(`
          *,
          category:categories(*)
        `)
        .order('created_at', { ascending: false });

      if (published !== null) {
        query = query.eq('published', published);
      }

      if (categorySlug) {
        const { data: category } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', categorySlug)
          .single();

        if (category) {
          query = query.eq('category_id', category.id);
        }
      }

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      setError(err.message);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }

  return { posts, loading, error, refetch: fetchPosts };
}

export function usePost(slug) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  async function fetchPost() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          category:categories(*)
        `)
        .eq('slug', slug)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (err) {
      setError(err.message);
      setPost(null);
    } finally {
      setLoading(false);
    }
  }

  return { post, loading, error, refetch: fetchPost };
}

export function usePostById(id) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchPost();
    } else {
      setLoading(false);
    }
  }, [id]);

  async function fetchPost() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          category:categories(*)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (err) {
      setError(err.message);
      setPost(null);
    } finally {
      setLoading(false);
    }
  }

  return { post, loading, error, refetch: fetchPost };
}

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (err) {
      setError(err.message);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }

  return { categories, loading, error, refetch: fetchCategories };
}

// Post mutations
export async function createPost(postData) {
  const slug = postData.slug || generateSlug(postData.title);
  const { data, error } = await supabase
    .from('posts')
    .insert([{
      ...postData,
      slug,
      category_id: postData.category_id || null
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updatePost(id, postData) {
  const { data, error } = await supabase
    .from('posts')
    .update({
      ...postData,
      category_id: postData.category_id || null,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePost(id) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Category mutations
export async function createCategory(categoryData) {
  const slug = categoryData.slug || generateSlug(categoryData.name);
  const { data, error } = await supabase
    .from('categories')
    .insert([{ ...categoryData, slug }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateCategory(id, categoryData) {
  const { data, error } = await supabase
    .from('categories')
    .update(categoryData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteCategory(id) {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Helper function to generate slug
function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
