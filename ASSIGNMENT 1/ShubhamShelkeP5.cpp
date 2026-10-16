#include <iostream>
using namespace std;

struct Node {
    int accNo;
    string name;
    float balance;
    Node* left;
    Node* right;
};

Node* createNode(int accNo, string name, float balance) {
    Node* newNode = new Node();
    newNode->accNo = accNo;
    newNode->name = name;
    newNode->balance = balance;
    newNode->left = nullptr;
    newNode->right = nullptr;
    return newNode;
}

Node* insert(Node* root, int accNo, string name, float balance) {
    if (root == nullptr) {
        return createNode(accNo, name, balance);
    }
    if (accNo < root->accNo) {
        root->left = insert(root->left, accNo, name, balance);
    } else if (accNo > root->accNo) {
        root->right = insert(root->right, accNo, name, balance);
    }
    return root;
}

Node* search(Node* root, int accNo) {
    if (root == nullptr || root->accNo == accNo) {
        return root;
    }
    if (accNo < root->accNo) {
        return search(root->left, accNo);
    }
    return search(root->right, accNo);
}

Node* findMin(Node* root) {
    while (root->left != nullptr) {
        root = root->left;
    }
    return root;
}

Node* findMax(Node* root) {
    while (root->right != nullptr) {
        root = root->right;
    }
    return root;
}

Node* deleteNode(Node* root, int accNo) {
    if (root == nullptr) {
        return root;
    }
    if (accNo < root->accNo) {
        root->left = deleteNode(root->left, accNo);
    } else if (accNo > root->accNo) {
        root->right = deleteNode(root->right, accNo);
    } else {
        if (root->left == nullptr) {
            Node* temp = root->right;
            delete root;
            return temp;
        } else if (root->right == nullptr) {
            Node* temp = root->left;
            delete root;
            return temp;
        }
        Node* temp = findMin(root->right);
        root->accNo = temp->accNo;
        root->name = temp->name;
        root->balance = temp->balance;
        root->right = deleteNode(root->right, temp->accNo);
    }
    return root;
}

void inorder(Node* root) {
    if (root != nullptr) {
        inorder(root->left);
        cout << "Account No: " << root->accNo << ", Name: " << root->name << ", Balance: " << root->balance << endl;
        inorder(root->right);
    }
}

void preorder(Node* root) {
    if (root != nullptr) {
        cout << "Account No: " << root->accNo << ", Name: " << root->name << ", Balance: " << root->balance << endl;
        preorder(root->left);
        preorder(root->right);
    }
}

void postorder(Node* root) {
    if (root != nullptr) {
        postorder(root->left);
        postorder(root->right);
        cout << "Account No: " << root->accNo << ", Name: " << root->name << ", Balance: " << root->balance << endl;
    }
}

int height(Node* root) {
    if (root == nullptr) {
        return 0;
    }
    int leftHeight = height(root->left);
    int rightHeight = height(root->right);
    return max(leftHeight, rightHeight) + 1;
}

int findDepth(Node* root, int accNo) {
    if (root == nullptr) {
        return -1;
    }
    if (root->accNo == accNo) {
        return 0;
    }
    int depth = findDepth(root->left, accNo);
    if (depth != -1) {
        return depth + 1;
    }
    depth = findDepth(root->right, accNo);
    if (depth != -1) {
        return depth + 1;
    }
    return -1;
}

void mirror(Node* root) {
    if (root == nullptr) {
        return;
    }
    mirror(root->left);
    mirror(root->right);
    swap(root->left, root->right);
}

void displayAccount(Node* root) {
    if (root != nullptr) {
        cout << "Account No: " << root->accNo << ", Name: " << root->name << ", Balance: " << root->balance << endl;
        displayAccount(root->left);
        displayAccount(root->right);
    }
}

int main() {
    Node* root = nullptr;
    int choice, accNo;
    string name;
    float balance;

    do {
        cout << "\nBank Account Management System\n";
        cout << "1. Create Account\n";
        cout << "2. Insert Account\n";
        cout << "3. Delete Account\n";
        cout << "4. Search Account\n";
        cout << "5. Traverse Account\n";
        cout << "6. Find minimum Account\n";
        cout << "7. Find maximum Account\n";
        cout << "8. Find height of tree\n";
        cout << "9. Find depth of a node\n";
        cout << "10. Mirror the tree\n";
        cout << "11. Exit\n";
        cout << "Enter your choice: ";
        cin >> choice;

        switch (choice) {
            case 1:
                cout << "Enter Account No: ";
                cin >> accNo;
                cout << "Enter Name: ";
                cin >> name;
                cout << "Enter Balance: ";
                cin >> balance;
                root = createNode(accNo, name, balance);
                cout << "Account created successfully!\n";
                break;
            case 2:
                cout << "Enter Account No: ";
                cin >> accNo;
                cout << "Enter Name: ";
                cin >> name;
                cout << "Enter Balance: ";
                cin >> balance;
                root = insert(root, accNo, name, balance);
                cout << "Account inserted successfully!\n";
                break;
            case 3:
                cout << "Enter Account No to delete: ";
                cin >> accNo;
                root = deleteNode(root, accNo);
                cout << "Account deleted successfully!\n";
                break;
            case 4:
                cout << "Enter Account No to search: ";
                cin >> accNo;
                Node* foundNode = search(root, accNo);
                if (foundNode != nullptr) {
                    cout << "Account found: Account No: " << foundNode->accNo << ", Name: " << foundNode->name << ", Balance: " << foundNode->balance << endl;
                } else {
                    cout << "Account not found!\n";
                }
                break;
            case 5:
                cout << "Inorder Traversal:\n";
                inorder(root);
                cout << "Preorder Traversal:\n";
                preorder(root);
                cout << "Postorder Traversal:\n";
                postorder(root);
                break;
            case 6:
                Node* minNode = findMin(root);
                if (minNode != nullptr) {
                    cout << "Minimum Account: Account No: " << minNode->accNo << ", Name: " << minNode->name << ", Balance: " << minNode->balance << endl;
                } else {
                    cout << "Tree is empty!\n";
                }
                break;
            case 7:
                Node* maxNode = findMax(root);
                if (maxNode != nullptr) {
                    cout << "Maximum Account: Account No: " << maxNode->accNo << ", Name: " << maxNode->name << ", Balance: " << maxNode->balance << endl;
                } else {
                    cout << "Tree is empty!\n";
                }
                break;
            case 8:
                cout << "Height of tree: " << height(root) << endl;
                break;
            case 9:
                cout << "Enter Account No to find depth: ";
                cin >> accNo;
                int depth = findDepth(root, accNo);
                if (depth != -1) {
                    cout << "Depth of node with Account No " << accNo << ": " << depth << endl;
                } else {
                    cout << "Account not found!\n";
                }
                break;
            case 10:
                mirror(root);
                cout << "Tree mirrored successfully!\n";
                break;
            case 11:
                cout << "Exiting...\n";
                break;
            default:
                cout << "Invalid choice! Please try again.\n";
        }
    } while (choice != 11);
}