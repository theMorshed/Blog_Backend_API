// Importing the `Query` type from Mongoose to work with MongoDB queries and ensure type safety.
import { Query } from "mongoose";

/**
 * A class for building and chaining MongoDB queries.
 * Provides methods for searching, filtering, sorting, pagination, and selecting fields.
 */
class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;  // Mongoose query object
    public query: Record<string, unknown>;  // The query parameters provided by the user

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    /**
     * Adds search functionality to the query.
     * Searches for a term in the specified fields if a `search` is provided.
     * 
     * @param searchableFields - List of fields to search on.
     * @returns {QueryBuilder<T>} - Returns the updated QueryBuilder instance with the search filter applied.
     */
    search(searchableFields: string[]) {
        const search = this?.query?.search; // Extracts the search term from the query parameters
        if (search) {
            // Adds a regex search to the query for the specified fields
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({            
                    [field]: {$regex: search, $options: 'i'}, // Case-insensitive search
                }))
            });
        }

        return this;    
    }

    /**
     * Sorts the query results based on `sortBy` and `sortOrder` parameters.
     * Defaults to sorting by `createdAt` in descending order if no parameters are provided.
     *
     * @returns {QueryBuilder<T>} - Returns the updated QueryBuilder instance with sorting applied.
     */
    sort() {
        const sortBy = this?.query?.sortBy || 'createdAt'; // Default sort field is `createdAt`
        const sortOrder = this?.query?.sortOrder === 'desc' ? '-' : ''; // Add `-` for descending order
        const sortString = `${sortOrder}${sortBy}`; // Construct the sort string
        this.modelQuery = this.modelQuery.sort(sortString); // Apply sorting to the query

        return this;
    }


    /**
     * Applies filters to the query by removing unwanted fields.
     * The fields `searchTerm`, `sort`, `limit`, `page`, and `fields` are excluded from the filter query.
     * 
     * @returns {QueryBuilder<T>} - Returns the updated QueryBuilder instance with filters applied.
     */
    filter() {
        const queryObj = {...this.query}; // Copies the query object to avoid mutation
        const excludeFields = ['search', 'sortBy', 'sortOrder', 'limit', 'page', 'fields']; // Fields to exclude from filtering
        excludeFields.forEach(el => delete queryObj[el]); // Removes excluded fields from the query
        this.modelQuery = this.modelQuery.find(queryObj); // Applies the filter to the model query

        return this;
    }
}

export default QueryBuilder;