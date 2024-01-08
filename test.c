#include <stdio.h>
#include <stdlib.h>

// Node structure for the linked list
struct Node {
    int data;
    struct Node* next;
};

// Function to swap the values of two nodes in a linked list
void swapNodes(struct Node* head, int x, int y) {
    if (x == y) {
        // No need to swap if both values are the same
        return;
    }

    // Find nodes with values x and y
    struct Node *prevX = NULL, *currX = head;
    while (currX != NULL && currX->data != x) {
        prevX = currX;
        currX = currX->next;
    }

    struct Node *prevY = NULL, *currY = head;
    while (currY != NULL && currY->data != y) {
        prevY = currY;
        currY = currY->next;
    }

    // If either x or y is not present, return without swapping
    if (currX == NULL || currY == NULL) {
        printf("One or both values not found. No swapping performed.\n");
        return;
    }

    // If x is not the head of the list
    if (prevX != NULL) {
        prevX->next = currY;
    } else {
        // x is the head of the list, update head
        head = currY;
    }

    // If y is not the head of the list
    if (prevY != NULL) {
        prevY->next = currX;
    } else {
        // y is the head of the list, update head
        head = currX;
    }

    // Swap next pointers
    struct Node* temp = currX->next;
    currX->next = currY->next;
    currY->next = temp;
}

// Function to print the linked list
void printList(struct Node* head) {
    while (head != NULL) {
        printf("%d ", head->data);
        head = head->next;
    }
    printf("\n");
}

// Main function to test swapping nodes
int main() {
    struct Node* head = (struct Node*)malloc(sizeof(struct Node));
    head->data = 10;
    head->next = NULL;

    struct Node* second = (struct Node*)malloc(sizeof(struct Node));
    second->data = 20;
    second->next = NULL;

    struct Node* third = (struct Node*)malloc(sizeof(struct Node));
    third->data = 30;
    third->next = NULL;

    // Linking nodes
    head->next = second;
    second->next = third;

    // Print the linked list before swapping
    printf("Linked List before swapping: ");
    printList(head);

    int x, y;
    // Get input from the user
    printf("Enter the first element to swap: ");
    scanf("%d", &x);
    printf("Enter the second element to swap: ");
    scanf("%d", &y);

    // Swap nodes based on user input
    swapNodes(head, x, y);

    // Print the linked list after swapping
    printf("Linked List after swapping: ");
    printList(head);

    return 0;
}
